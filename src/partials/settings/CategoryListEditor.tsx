import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "@/features/persistence/db";
import { TranslatedCategory } from "@/features/persistence/entities/translated/TranslatedCategory";
import { populateCategory } from "@/features/persistence/populate/_category";
import Button from "@/lib/components/button";
import Div from "@/lib/components/div";
import Span from "@/lib/components/span";
import { cn } from "@/utilities/cn";

export default function CategoryListEditor({ binderUuid }: { binderUuid: string }) {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<TranslatedCategory[]>([]);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const cats = await db.getTranslatedCategories(binderUuid);
      setCategories(cats);
    } catch (err) {
      setError(t("errors.loadingCategories"));
    }
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binderUuid, t]);

  const handleAdd = async () => {
    if (!newName.trim()) {
      setError(t("errors.categoryNameRequired"));
      return;
    }
    try {
      await populateCategory([
        { language: "fr-FR", key: "name", value: newName },
        { language: "en-US", key: "name", value: newName }
      ], newIcon || "category");
      setNewName("");
      setNewIcon("");
      setError(null);
      await loadCategories();
    } catch (err) {
      setError(t("errors.addingCategory"));
    }
  };

  const handleEdit = (cat: TranslatedCategory) => {
    setEditId(cat.uuid);
    setEditName(cat.name);
    setEditIcon(cat.icon);
  };

  const handleSave = async () => {
    if (!editName.trim() || !editId) return;
    try {
      await db.updateTranslatedCategory({ uuid: editId, name: editName, icon: editIcon }, i18n.language);
      setEditId(null);
      setEditName("");
      setEditIcon("");
      setError(null);
      await loadCategories();
    } catch (err) {
      setError(t("errors.updatingCategory"));
    }
  };

  const handleDelete = async (uuid: string) => {
    try {
      await db.categories.delete(uuid);
      setError(null);
      await loadCategories();
    } catch (err) {
      setError(t("errors.deletingCategory"));
    }
  };

  return (
    <Div className="flex flex-col">
      <h3 className="text-xl font-bold mb-2">{t("pages.settings.categories")}</h3>
      {error && <Div className="p-2 bg-red-100 text-red-700 rounded">{error}</Div>}
      <Div className="flex flex-col gap-2">
        {categories.map(cat => (
          <Div key={cat.uuid} className="flex items-center gap-2 p-2 border rounded bg-zinc-100 dark:bg-zinc-800">
            {editId === cat.uuid ? (
              <>
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="p-1 border rounded w-32"
                />
                <input
                  value={editIcon}
                  onChange={e => setEditIcon(e.target.value)}
                  className="p-1 border rounded w-24"
                />
                <Button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded">{t("pages.settings.save")}</Button>
                <Button onClick={() => setEditId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">{t("pages.settings.cancel")}</Button>
              </>
            ) : (
              <>
                <Span className={cn("icon")}>{cat.icon}</Span>
                <span className="font-semibold flex-1">{cat.name}</span>
                <Button onClick={() => handleEdit(cat)} className="bg-blue-500 text-white px-2 py-1 rounded">{t("pages.settings.edit")}</Button>
                <Button onClick={() => handleDelete(cat.uuid)} className="bg-red-500 text-white px-2 py-1 rounded">{t("pages.settings.delete")}</Button>
              </>
            )}
          </Div>
        ))}
      </Div>
      <Div className="border-t pt-4 mt-4">
        <h4 className="font-bold mb-2">{t("pages.settings.addCategory")}</h4>
        <input
          placeholder={t("pages.settings.categoryName")}
          className="border p-1 w-full mb-2"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <input
          placeholder={t("pages.settings.categoryIcon")}
          className="border p-1 w-full mb-2"
          value={newIcon}
          onChange={e => setNewIcon(e.target.value)}
        />
        <Button onClick={handleAdd} className="bg-sky-500 text-white px-3 py-1 rounded w-full">{t("pages.settings.add")}</Button>
      </Div>
    </Div>
  );
} 