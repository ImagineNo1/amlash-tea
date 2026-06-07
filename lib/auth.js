import crypto from "crypto";
import { cookies } from "next/headers";
import { getDb } from "./mongodb";

const SESSION_COOKIE = "amlash_admin_session";

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function sign(data) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return crypto.createHmac("sha256", secret).update(data).digest("base64url");
}

function getSessionCookieOptions({ secure } = {}) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: secure ?? (process.env.NODE_ENV === "production"),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function shouldUseSecureCookie(request) {
  const forwardedProto = request?.headers?.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const requestProto = request?.nextUrl?.protocol?.replace(":", "");
  const protocol = forwardedProto || requestProto;

  if (process.env.FORCE_SECURE_COOKIES === "true") return true;
  if (protocol) return protocol === "https";
  return process.env.NODE_ENV === "production";
}

export function getAuthDebugInfo(request, cookieOptions = getSessionCookieOptions()) {
  const forwardedProto = request?.headers?.get("x-forwarded-proto")?.split(",")[0]?.trim() || null;
  const requestProto = request?.nextUrl?.protocol || null;

  return {
    nodeEnv: process.env.NODE_ENV || null,
    hasJwtSecret: Boolean(process.env.JWT_SECRET),
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    forwardedProto,
    requestProto,
    cookie: {
      name: SESSION_COOKIE,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    },
  };
}

export function createToken(payload) {
  const header = { alg: "HS256", typ: "JWT" };
  const body = { ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 };
  const encoded = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(body))}`;
  return `${encoded}.${sign(encoded)}`;
}

export function verifyToken(token) {
  if (!token) return null;
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return null;
  const expected = sign(`${header}.${payload}`);
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (parsed.exp && parsed.exp < Math.floor(Date.now() / 1000)) return null;
  return parsed;
}

export function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const attempt = hashPassword(password, salt).split(":")[1];
  if (hash.length !== attempt.length) return false;
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(attempt, "hex"));
}

export async function ensureDefaultAdmin() {
  const db = await getDb();
  const users = db.collection("admin_users");
  await users.createIndex({ username: 1 }, { unique: true });
  const existing = await users.findOne({ username: "admin" });
  if (!existing) {
    await users.insertOne({ username: "admin", passwordHash: hashPassword("admin"), role: "admin", createdAt: new Date(), updatedAt: new Date() });
  }
}

export async function getCurrentAdmin() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const payload = verifyToken(token);
  if (!payload?.sub) return null;
  return payload;
}

export function setSessionCookie(token, response, options = {}) {
  const cookieOptions = getSessionCookieOptions(options);
  if (response) {
    response.cookies.set(SESSION_COOKIE, token, cookieOptions);
    return response;
  }
  cookies().set(SESSION_COOKIE, token, cookieOptions);
}

export function clearSessionCookie(response, options = {}) {
  const cookieOptions = getSessionCookieOptions(options);
  if (response) {
    response.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
    return response;
  }
  cookies().delete(SESSION_COOKIE);
}

export { SESSION_COOKIE };
