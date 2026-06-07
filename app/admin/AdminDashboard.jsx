"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultContent } from "@/lib/content-defaults";
import { Check, Eye, FileText, Home, Image, Info, Leaf, LogOut, Package, Save, Settings, ShieldCheck, Trash2, Upload, Users } from "lucide-react";

const sections = [
  { key: "hero", label: "صفحه اصلی", icon: Home, description: "عنوان قهرمان، دکمه‌ها و تصویر پس‌زمینه" },
  { key: "story", label: "درباره ما", icon: Info, description: "داستان برند، آمار و تایم‌لاین" },
  { key: "products", label: "محصولات", icon: Package, description: "کارت‌های محصول و جزئیات هر محصول" },
  { key: "gallery", label: "گالری", icon: Image, description: "تصاویر قابل نمایش سایت" },
  { key: "testimonials", label: "نظرات مشتریان", icon: Users, description: "بازخوردها و امتیازها" },
  { key: "faqs", label: "سوالات متداول", icon: FileText, description: "پرسش‌ها، پاسخ‌ها و دسته‌بندی‌ها" },
  { key: "bulkOrder", label: "سفارش عمده", icon: Package, description: "گزینه‌های فرم و مزیت‌ها" },
  { key: "contact", label: "تماس با ما", icon: Info, description: "تلفن، ایمیل، آدرس و ساعت کاری" },
  { key: "site", label: "تنظیمات سایت", icon: Settings, description: "نام برند، منو و فوتر" },
  { key: "productFeatures", label: "کیفیت چای", icon: ShieldCheck, description: "ویژگی‌ها و مزایای محصول" },
  { key: "features", label: "بخش‌های فعال", icon: Check, description: "ویژگی‌های کوتاه سایت" },
  { key: "quote", label: "نقل‌قول", icon: Leaf, description: "بنر الهام‌بخش" },
  { key: "location", label: "موقعیت", icon: Home, description: "نقشه و شعبه‌ها" },
  { key: "footer", label: "فوتر", icon: FileText, description: "متن کپی‌رایت و توضیح پایین سایت" },
];


function normalizeGalleryImage(item, index, fallbackTitle) {
  if (typeof item === "string") {
    return { src: item, alt: fallbackTitle || "تصویر گالری", caption: fallbackTitle || "تصویر گالری", cols: index === 0 ? "md:col-span-2 md:row-span-2" : index === 5 ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1" };
  }

  return {
    src: item?.src || "",
    alt: item?.alt || fallbackTitle || "تصویر گالری",
    caption: item?.caption || fallbackTitle || "تصویر گالری",
    cols: item?.cols || (index === 0 ? "md:col-span-2 md:row-span-2" : index === 5 ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1"),
  };
}

function ImageUploadButton({ label = "آپلود تصویر", compact = false, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json().catch(() => ({}));
    setUploading(false);

    if (!res.ok) {
      setError(data.message || "آپلود تصویر ناموفق بود.");
      return;
    }

    onUploaded(data.url);
  };

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <label className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#466332]/20 bg-[#466332]/10 px-4 text-sm font-bold text-[#466332] transition hover:bg-[#466332]/15 ${compact ? "h-10" : "h-12 w-full"}`}>
        <Upload size={16} />
        {uploading ? "در حال آپلود..." : label}
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadImage} disabled={uploading} className="sr-only" />
      </label>
      {error && <p className="text-xs font-bold leading-6 text-red-600">{error}</p>}
    </div>
  );
}

function ProductsImageManager({ data, update }) {
  const items = data.items || [];

  const updateProductImage = (index, image) => {
    const nextItems = items.map((item, itemIndex) => itemIndex === index ? { ...item, image } : item);
    update({ items: nextItems });
  };

  if (!items.length) {
    return <p className="rounded-2xl bg-[#F7F6F2] p-4 text-sm leading-7 text-[#1A2F23]/60">ابتدا محصولات را در JSON اضافه کنید، سپس برای هر محصول عکس آپلود کنید.</p>;
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-black text-[#1A2F23]">آپلود دستی عکس محصولات</p>
        <p className="mt-1 text-xs leading-6 text-[#1A2F23]/55">برای هر نوع چای، فایل را از سیستم انتخاب کنید؛ آدرس عکس به‌صورت خودکار در فیلد image همان محصول ثبت می‌شود.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((product, index) => (
          <div key={`${product.name}-${index}`} className="rounded-2xl border border-[#1A2F23]/10 bg-[#F7F6F2] p-3">
            <div className="mb-3 flex items-center gap-3">
              <img src={product.image} alt={product.name || `product-${index + 1}`} className="h-16 w-16 rounded-xl object-cover bg-white" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-[#1A2F23]">{product.name || `محصول ${index + 1}`}</p>
                <p className="truncate text-xs text-[#1A2F23]/50" dir="ltr">{product.image}</p>
              </div>
            </div>
            <ImageUploadButton compact label="انتخاب عکس از سیستم" onUploaded={(url) => updateProductImage(index, url)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryImageManager({ data, update }) {
  const images = data.images || [];

  const addGalleryImage = (src) => {
    update({ images: [...images, { src, alt: data.title || "تصویر گالری", caption: data.title || "تصویر گالری", cols: "md:col-span-1 md:row-span-1" }] });
  };

  const replaceGalleryImage = (index, src) => {
    const current = normalizeGalleryImage(images[index], index, data.title);
    const nextImages = images.map((item, itemIndex) => itemIndex === index ? { ...current, src } : item);
    update({ images: nextImages });
  };

  const removeGalleryImage = (index) => {
    update({ images: images.filter((_, itemIndex) => itemIndex !== index) });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-dashed border-[#466332]/25 bg-[#466332]/5 p-4">
        <p className="text-sm font-black text-[#1A2F23]">افزودن عکس جدید به گالری حال‌وهوای املش</p>
        <p className="mt-1 text-xs leading-6 text-[#1A2F23]/55">تصویر را از سیستم آپلود کنید تا به انتهای گالری اضافه شود.</p>
        <div className="mt-3"><ImageUploadButton label="آپلود و افزودن به گالری" onUploaded={addGalleryImage} /></div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {images.map((item, index) => {
          const image = normalizeGalleryImage(item, index, data.title);
          return (
            <div key={`${image.src}-${index}`} className="rounded-2xl border border-[#1A2F23]/10 bg-[#F7F6F2] p-3">
              <img src={image.src} alt={image.alt} className="mb-3 h-32 w-full rounded-xl object-cover bg-white" />
              <p className="mb-3 truncate text-xs text-[#1A2F23]/50" dir="ltr">{image.src}</p>
              <div className="flex flex-wrap items-center gap-2">
                <ImageUploadButton compact label="جایگزینی عکس" onUploaded={(url) => replaceGalleryImage(index, url)} />
                <button type="button" onClick={() => removeGalleryImage(index)} className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 text-xs font-bold text-red-600">
                  <Trash2 size={14} /> حذف
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, textarea = false }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <label className="block">
      <span className="text-xs font-bold text-[#1A2F23]/55">{label}</span>
      <Comp value={value || ""} onChange={(e) => onChange(e.target.value)} className={`mt-2 w-full rounded-2xl border border-[#1A2F23]/10 bg-white px-4 py-3 outline-none focus:border-[#B47B59] ${textarea ? "min-h-28 leading-8" : "h-12"}`} />
    </label>
  );
}

export default function AdminDashboard({ initialContent, admin }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent || defaultContent);
  const [active, setActive] = useState("hero");
  const [jsonText, setJsonText] = useState(JSON.stringify((initialContent || defaultContent).hero, null, 2));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const activeSection = useMemo(() => sections.find((section) => section.key === active), [active]);
  const activeData = content[active] || {};

  const switchSection = (key) => {
    setActive(key);
    setMessage("");
    setJsonText(JSON.stringify(content[key] || {}, null, 2));
  };

  const updateSection = (patch) => {
    const next = { ...content, [active]: { ...content[active], ...patch } };
    setContent(next);
    setJsonText(JSON.stringify(next[active], null, 2));
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setContent({ ...content, [active]: parsed });
      setMessage("JSON این بخش اعمال شد؛ برای ثبت نهایی ذخیره کنید.");
    } catch (error) {
      setMessage("JSON معتبر نیست: " + error.message);
    }
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
    setSaving(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.message || "ذخیره‌سازی ناموفق بود");
      return;
    }
    setContent(data.content);
    setJsonText(JSON.stringify(data.content[active] || {}, null, 2));
    setMessage("تغییرات با موفقیت در MongoDB ذخیره شد.");
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#F7F6F2] text-[#1A2F23]" dir="rtl">
      <div className="fixed inset-y-0 right-0 hidden w-72 overflow-hidden bg-[#1A2F23] text-white lg:block">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 15%, rgba(215,180,106,.35), transparent 30%), radial-gradient(circle at 80% 85%, rgba(70,99,50,.55), transparent 36%)" }} />
        <div className="relative flex h-full flex-col p-6">
          <div className="mb-8 flex items-center gap-3"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D7B46A]/15 text-[#D7B46A]"><Leaf size={30} /></div><div><h1 className="text-xl font-black text-[#D7B46A]">چای املش</h1><p className="text-xs text-white/55">پنل مدیریت محتوا</p></div></div>
          <nav className="flex-1 space-y-2 overflow-y-auto pl-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const selected = active === section.key;
              return <button key={section.key} onClick={() => switchSection(section.key)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-right text-sm transition ${selected ? "bg-[#466332] text-white shadow-lg" : "text-white/75 hover:bg-white/10 hover:text-white"}`}><Icon size={18} /><span>{section.label}</span></button>;
            })}
          </nav>
          <button onClick={logout} className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm text-white/80 hover:bg-white/10"><LogOut size={18} /> خروج</button>
        </div>
      </div>

      <section className="lg:mr-72">
        <header className="sticky top-0 z-20 border-b border-[#1A2F23]/10 bg-white/80 backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
            <div><p className="text-sm text-[#B47B59]">سلام {admin?.username}</p><h2 className="text-2xl font-black">مدیریت چای املش</h2></div>
            <div className="flex flex-wrap items-center gap-3">
              <a href="/" target="_blank" className="flex h-11 items-center gap-2 rounded-2xl border border-[#1A2F23]/10 bg-white px-4 text-sm font-bold"><Eye size={18} /> پیش‌نمایش سایت</a>
              <button onClick={save} disabled={saving} className="flex h-11 items-center gap-2 rounded-2xl bg-[#466332] px-5 text-sm font-bold text-white shadow-lg shadow-[#466332]/20 disabled:opacity-60"><Save size={18} /> {saving ? "در حال ذخیره" : "ذخیره تغییرات"}</button>
            </div>
          </div>
        </header>

        <div className="grid gap-5 p-5 md:grid-cols-4 md:p-8">
          <Stat title="تعداد محصولات" value={content.products?.items?.length || 0} />
          <Stat title="تصاویر گالری" value={content.gallery?.images?.length || 0} />
          <Stat title="سوالات متداول" value={content.faqs?.items?.length || 0} />
          <Stat title="بخش‌های قابل ویرایش" value={sections.length} />
        </div>

        <div className="grid gap-6 px-5 pb-10 md:px-8 xl:grid-cols-[1fr_430px]">
          <div className="rounded-[2rem] border border-[#1A2F23]/10 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-sm font-bold text-[#B47B59]">{activeSection?.label}</p><h3 className="mt-1 text-xl font-black">ویرایش سریع محتوا</h3><p className="mt-2 text-sm leading-7 text-[#1A2F23]/55">{activeSection?.description}</p></div><div className="rounded-2xl bg-[#F7F6F2] p-3 text-[#466332]"><SectionIcon icon={activeSection?.icon} /></div></div>
            <QuickEditor sectionKey={active} data={activeData} update={updateSection} />
          </div>

          <div className="rounded-[2rem] border border-[#1A2F23]/10 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-4"><p className="text-sm font-bold text-[#B47B59]">ویرایش پیشرفته</p><h3 className="text-xl font-black">JSON بخش انتخاب‌شده</h3><p className="mt-2 text-sm leading-7 text-[#1A2F23]/55">برای لیست‌ها مثل محصولات، FAQ و گالری، مقدار JSON را ویرایش کنید.</p></div>
            <textarea dir="ltr" value={jsonText} onChange={(e) => setJsonText(e.target.value)} className="h-[520px] w-full rounded-2xl border border-[#1A2F23]/10 bg-[#0f1f17] p-4 font-mono text-xs leading-6 text-[#e7f3df] outline-none focus:border-[#B47B59]" />
            <button onClick={applyJson} className="mt-4 h-11 w-full rounded-2xl border border-[#B47B59]/30 bg-[#B47B59]/10 text-sm font-bold text-[#8A5A3C]">اعمال JSON در فرم</button>
            {message && <p className="mt-4 rounded-2xl bg-[#F7F6F2] p-4 text-sm leading-7 text-[#1A2F23]/70">{message}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionIcon({ icon: Icon }) {
  return Icon ? <Icon size={24} /> : null;
}

function Stat({ title, value }) {
  return <div className="rounded-[1.5rem] border border-[#1A2F23]/10 bg-white p-5 shadow-sm"><p className="text-sm text-[#1A2F23]/50">{title}</p><p className="mt-2 text-3xl font-black text-[#1A2F23]">{value}</p></div>;
}

function QuickEditor({ sectionKey, data, update }) {
  if (["hero", "contact", "quote", "footer", "location"].includes(sectionKey)) {
    const fields = Object.keys(data).filter((key) => typeof data[key] === "string");
    return <div className="grid gap-4 md:grid-cols-2">{fields.map((field) => <TextInput key={field} label={field} value={data[field]} textarea={String(data[field]).length > 90} onChange={(value) => update({ [field]: value })} />)}</div>;
  }
  if (sectionKey === "site") {
    return <div className="grid gap-4 md:grid-cols-2"><TextInput label="brandName" value={data.brandName} onChange={(value) => update({ brandName: value })} /><TextInput label="tagline" value={data.tagline} onChange={(value) => update({ tagline: value })} /><TextInput label="logoAccent" value={data.logoAccent} onChange={(value) => update({ logoAccent: value })} /></div>;
  }
  if (sectionKey === "products") {
    return <div className="space-y-5"><TextInput label="eyebrow" value={data.eyebrow} onChange={(value) => update({ eyebrow: value })} /><TextInput label="title" value={data.title} onChange={(value) => update({ title: value })} /><TextInput label="subtitle" value={data.subtitle} textarea onChange={(value) => update({ subtitle: value })} /><ProductsImageManager data={data} update={update} /><p className="rounded-2xl bg-[#F7F6F2] p-4 text-sm leading-7 text-[#1A2F23]/60">برای ویرایش متن و جزئیات هر محصول از JSON استفاده کنید؛ برای تغییر عکس هر محصول می‌توانید فایل را مستقیم از سیستم آپلود کنید.</p></div>;
  }
  if (sectionKey === "gallery") {
    return <div className="space-y-5"><TextInput label="eyebrow" value={data.eyebrow} onChange={(value) => update({ eyebrow: value })} /><TextInput label="title" value={data.title} onChange={(value) => update({ title: value })} /><TextInput label="subtitle" value={data.subtitle || ""} textarea onChange={(value) => update({ subtitle: value })} /><GalleryImageManager data={data} update={update} /></div>;
  }
  return <div className="space-y-4"><TextInput label="eyebrow" value={data.eyebrow} onChange={(value) => update({ eyebrow: value })} /><TextInput label="title" value={data.title} onChange={(value) => update({ title: value })} /><TextInput label="subtitle / body" value={data.subtitle || data.body || ""} textarea onChange={(value) => update(data.body !== undefined ? { body: value } : { subtitle: value })} /><p className="rounded-2xl bg-[#F7F6F2] p-4 text-sm leading-7 text-[#1A2F23]/60">برای آرایه‌ها و آیتم‌های تکرارشونده این بخش از ویرایشگر JSON استفاده کنید.</p></div>;
}
