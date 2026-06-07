import { defaultContent } from "./content-defaults";
import { getDb, hasMongoConfig } from "./mongodb";

const CONTENT_ID = "site-content";

function mergeContent(saved = {}) {
  return {
    ...defaultContent,
    ...saved,
    site: { ...defaultContent.site, ...(saved.site || {}) },
    hero: { ...defaultContent.hero, ...(saved.hero || {}) },
    story: { ...defaultContent.story, ...(saved.story || {}) },
    productFeatures: { ...defaultContent.productFeatures, ...(saved.productFeatures || {}) },
    features: { ...defaultContent.features, ...(saved.features || {}) },
    products: { ...defaultContent.products, ...(saved.products || {}) },
    gallery: { ...defaultContent.gallery, ...(saved.gallery || {}) },
    quote: { ...defaultContent.quote, ...(saved.quote || {}) },
    testimonials: { ...defaultContent.testimonials, ...(saved.testimonials || {}) },
    faqs: { ...defaultContent.faqs, ...(saved.faqs || {}) },
    bulkOrder: { ...defaultContent.bulkOrder, ...(saved.bulkOrder || {}) },
    contact: { ...defaultContent.contact, ...(saved.contact || {}) },
    location: { ...defaultContent.location, ...(saved.location || {}) },
    footer: { ...defaultContent.footer, ...(saved.footer || {}) },
  };
}

export async function getSiteContent() {
  if (!hasMongoConfig()) return defaultContent;
  try {
    const db = await getDb();
    const doc = await db.collection("site_content").findOne({ _id: CONTENT_ID });
    if (!doc) {
      await db.collection("site_content").insertOne({ _id: CONTENT_ID, ...defaultContent, createdAt: new Date(), updatedAt: new Date() });
      return defaultContent;
    }
    const { _id, createdAt, updatedAt, ...content } = doc;
    return mergeContent(content);
  } catch (error) {
    console.error("Failed to load site content", error);
    return defaultContent;
  }
}

export async function saveSiteContent(content) {
  const db = await getDb();
  const merged = mergeContent(content);
  await db.collection("site_content").updateOne(
    { _id: CONTENT_ID },
    { $set: { ...merged, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  );
  return merged;
}
