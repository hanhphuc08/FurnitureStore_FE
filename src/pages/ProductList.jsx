import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MainFooter from "../components/layout/MainFooter.jsx";
import MainHeader from "../components/layout/MainHeader.jsx";
import { getCategoryTree, getProducts } from "../api/productApi.js";

const materials = ["Vải", "Da", "Gỗ", "Kim loại"];

function formatVnd(value) {
  const num = Number(value || 0);
  return num.toLocaleString("vi-VN") + "₫";
}

function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tree, setTree] = useState([]);
  const [loadingTree, setLoadingTree] = useState(true);

  const [products, setProducts] = useState([]);
  const [paging, setPaging] = useState({ page: 1, size: 12, total: 0, totalPages: 1 });
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [error, setError] = useState("");

  // --- Read filters from URL ---
  const selectedCategory = searchParams.get("category") || ""; // slug
  const selectedMaterials = searchParams.getAll("material"); // multi
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page") || "1");
  const size = Number(searchParams.get("size") || "12");

  // range UI (demo): dùng maxPrice làm chính cho slider (1 chiều)
  const rangeValue = Number(maxPrice || "25000000");

  // --- Load category tree ---
  useEffect(() => {
    let mounted = true;
    async function loadTree() {
      try {
        setLoadingTree(true);
        const data = await getCategoryTree();
        if (!mounted) return;
        setTree(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Không tải được danh mục");
      } finally {
        if (mounted) setLoadingTree(false);
      }
    }
    loadTree();
    return () => (mounted = false);
  }, []);

  // --- Load products when filters change ---
  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setError("");
        setLoadingProducts(true);

        const data = await getProducts({
          category: selectedCategory || undefined,
          material: selectedMaterials.length ? selectedMaterials : undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          sort,
          page,
          size,
        });

        if (!mounted) return;

        setProducts(Array.isArray(data?.items) ? data.items : []);
        setPaging(data?.paging || { page: 1, size: 12, total: 0, totalPages: 1 });
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Không tải được sản phẩm");
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    }

    loadProducts();
    return () => (mounted = false);
  }, [selectedCategory, selectedMaterials.join("|"), minPrice, maxPrice, sort, page, size]);

  // --- Helpers update URL params ---
  function updateParams(patch) {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([k, v]) => {
      if (v === null) {
        next.delete(k);
        return;
      }
      if (Array.isArray(v)) {
        next.delete(k);
        v.forEach((item) => next.append(k, item));
        return;
      }
      if (v === "" || v === undefined) next.delete(k);
      else next.set(k, String(v));
    });

    // đổi filter thì reset page về 1 (trừ khi patch có page)
    if (!("page" in patch)) next.set("page", "1");

    setSearchParams(next, { replace: true });
  }

  const flatCategories = useMemo(() => tree, [tree]);

  const titleText = useMemo(() => {
    if (!selectedCategory) return "Tất cả sản phẩm";
    const findName = (nodes) => {
      for (const n of nodes) {
        if (n.slug === selectedCategory) return n.name;
        if (n.children?.length) {
          const r = findName(n.children);
          if (r) return r;
        }
      }
      return null;
    };
    return findName(tree) || "Sản phẩm";
  }, [selectedCategory, tree]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-display text-[#343A40] dark:bg-background-dark dark:text-text-dark">
      <MainHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 lg:flex-row lg:gap-8">
        {/* SIDEBAR */}
        <aside className="lg:w-1/4">
          <div className="sticky top-28 space-y-6">
            <div>
              <h3 className="text-xl font-bold">Lọc sản phẩm</h3>
            </div>

            {/* CATEGORY TREE */}
            <div>
              <h4 className="mb-3 font-semibold">Danh mục</h4>

              {loadingTree ? (
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-4 w-3/4 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3 text-[#495057]">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      checked={!selectedCategory}
                      onChange={() => updateParams({ category: null })}
                      name="category"
                      type="radio"
                      className="text-[#2F4F4F] focus:ring-[#2F4F4F]/30"
                    />
                    <span>Tất cả</span>
                  </label>

                  {flatCategories.map((parent) => (
                    <div key={parent.id} className="space-y-2">
                      <label className="flex cursor-pointer items-center gap-2 font-semibold">
                        <input
                          checked={selectedCategory === parent.slug}
                          onChange={() => updateParams({ category: parent.slug })}
                          name="category"
                          type="radio"
                          className="text-[#2F4F4F] focus:ring-[#2F4F4F]/30"
                        />
                        <span>{parent.name}</span>
                      </label>

                      {Array.isArray(parent.children) && parent.children.length > 0 ? (
                        <div className="ml-6 space-y-2">
                          {parent.children.map((child) => (
                            <label key={child.id} className="flex cursor-pointer items-center gap-2">
                              <input
                                checked={selectedCategory === child.slug}
                                onChange={() => updateParams({ category: child.slug })}
                                name="category"
                                type="radio"
                                className="text-[#2F4F4F] focus:ring-[#2F4F4F]/30"
                              />
                              <span>{child.name}</span>
                            </label>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MATERIALS */}
            <div className="border-t border-[#DEE2E6] pt-6 dark:border-border-dark">
              <h4 className="mb-3 font-semibold">Chất liệu</h4>
              <div className="space-y-2 text-[#495057]">
                {materials.map((item) => {
                  const checked = selectedMaterials.includes(item);
                  return (
                    <label key={item} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          const next = new Set(selectedMaterials);
                          if (e.target.checked) next.add(item);
                          else next.delete(item);
                          updateParams({ material: Array.from(next) });
                        }}
                        className="rounded text-[#2F4F4F] focus:ring-[#2F4F4F]/30"
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* PRICE RANGE */}
            <div className="border-t border-[#DEE2E6] pt-6 dark:border-border-dark">
              <h4 className="mb-3 font-semibold">Mức giá</h4>
              <input
                type="range"
                min="1000000"
                max="50000000"
                value={rangeValue}
                onChange={(e) => updateParams({ maxPrice: e.target.value })}
                className="w-full accent-[#2F4F4F]"
              />
              <div className="mt-2 flex justify-between text-sm text-[#6c757d]">
                <span>1.000.000₫</span>
                <span>50.000.000₫</span>
              </div>
              <div className="mt-2 text-sm text-[#6c757d]">
                Đến: <span className="font-semibold text-[#2F4F4F]">{formatVnd(rangeValue)}</span>
              </div>
            </div>

            {/* APPLY / RESET */}
            <div className="flex gap-3 border-t border-[#DEE2E6] pt-6 dark:border-border-dark">
              <button
                className="flex-1 rounded-lg bg-[#2F4F4F] py-2 text-sm font-bold text-white"
                onClick={() => updateParams({})}
                type="button"
              >
                Áp dụng
              </button>
              <button
                className="flex-1 rounded-lg border border-[#DEE2E6] py-2 text-sm font-bold text-[#6c757d]"
                onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
                type="button"
              >
                Đặt lại
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <section className="mt-8 flex-1 lg:mt-0">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black">{titleText}</h1>
              <p className="text-[#6c757d]">
                Hiển thị {products.length} trên {paging.total} sản phẩm
              </p>
            </div>

            <select
              className="rounded-lg border border-[#DEE2E6] px-4 py-2 text-sm"
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
            >
              <option value="newest">Sắp xếp: Mới nhất</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
            </select>
          </div>

          {error ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
              {error}
            </div>
          ) : null}

          {/* GRID */}
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
            {loadingProducts
              ? Array.from({ length: 12 }).map((_, idx) => (
                  <div key={idx} className="group pb-3">
                    <div className="aspect-[3/4] w-full animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
                    <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                    <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                  </div>
                ))
              : products.map((product) => (
                  <Link
                    key={product.id || product.slug}
                    to={`/products/${product.slug}`}
                    className="group block pb-3"
                    title={product.name}
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <div
                        className="aspect-[3/4] w-full rounded-lg bg-cover bg-center transition group-hover:scale-105"
                        style={{
                          backgroundImage: `url("${
                            product.image ||
                            "https://images.unsplash.com/photo-1582582621959-48d27397dc04?auto=format&fit=crop&w=900&q=80"
                          }")`,
                        }}
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // TODO: wishlist API sau
                          alert("Đã thêm vào yêu thích (demo)");
                        }}
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 opacity-0 backdrop-blur transition group-hover:opacity-100"
                        aria-label="favorite"
                      >
                        <span className="material-symbols-outlined text-[#343A40]">favorite</span>
                      </button>
                    </div>

                    <div className="mt-3">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-[#2F4F4F]">{formatVnd(product.price)}</p>
                    </div>
                  </Link>
                ))}
          </div>

          {/* PAGINATION */}
          <nav className="mt-12 flex justify-center">
            <ul className="flex h-10 items-center">
              <li>
                <button
                  type="button"
                  disabled={paging.page <= 1}
                  onClick={() => updateParams({ page: Math.max(1, paging.page - 1) })}
                  className="flex h-10 items-center rounded-l-lg border border-r-0 border-[#DEE2E6] px-4 text-[#6c757d] disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
              </li>

              {Array.from({ length: Math.min(paging.totalPages, 5) }).map((_, i) => {
                const p = i + 1;
                const active = p === paging.page;
                return (
                  <li key={p}>
                    <button
                      type="button"
                      onClick={() => updateParams({ page: p })}
                      className={`flex h-10 items-center border border-r-0 border-[#DEE2E6] px-4 ${
                        active ? "bg-[#2F4F4F] text-white" : "text-[#6c757d]"
                      }`}
                    >
                      {p}
                    </button>
                  </li>
                );
              })}

              {paging.totalPages > 5 ? (
                <>
                  <li>
                    <span className="flex h-10 items-center border border-r-0 border-[#DEE2E6] px-4 text-[#6c757d]">
                      ...
                    </span>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => updateParams({ page: paging.totalPages })}
                      className="flex h-10 items-center border border-[#DEE2E6] px-4 text-[#6c757d]"
                    >
                      {paging.totalPages}
                    </button>
                  </li>
                </>
              ) : null}

              <li>
                <button
                  type="button"
                  disabled={paging.page >= paging.totalPages}
                  onClick={() => updateParams({ page: Math.min(paging.totalPages, paging.page + 1) })}
                  className="flex h-10 items-center rounded-r-lg border border-[#DEE2E6] px-4 text-[#6c757d] disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </li>
            </ul>
          </nav>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}

export default ProductListPage;
