// src/partials/settings/CategorySelector.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "@/features/persistence/db";
import { TranslatedCategory } from "@/features/persistence/entities/translated/TranslatedCategory";
import { populateCategory } from "@/features/persistence/populate/_category";

import Button from "@/lib/components/button";
import Div from "@/lib/components/div";
import Span from "@/lib/components/span";

import { cn } from "@/utilities/cn";

export default function CategorySelector({
  pictogramUuid,
  currentCategoryUuid,
  binderUuid,
  onChange
}: {
  pictogramUuid: string;
  currentCategoryUuid: string;
  binderUuid: string;
  onChange: (categoryUuid: string) => void;
}) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<TranslatedCategory[]>([]);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const cats = await db.getTranslatedCategories(binderUuid);
      setCategories(cats);
    } catch (err) {
      console.error("Erreur lors du chargement des catégories:", err);
      setError(t("errors.loadingCategories"));
    }
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binderUuid, t]);

  const handleAddCategory = async () => {
    if (!newName.trim()) {
      setError(t("errors.categoryNameRequired"));
      return;
    }

    try {
      const uuid = await populateCategory([
        { language: "fr-FR", key: "name", value: newName },
        { language: "en-US", key: "name", value: newName }
      ], newIcon || "category");
      // Mettre à jour la catégorie de la picto
      await db.updatePictogram({ uuid: pictogramUuid, categoryUuid: uuid } as any);
      onChange(uuid);
      // Réinitialiser le formulaire et fermer la fenêtre
      setNewName("");
      setNewIcon("");
      setError(null);
      setShowModal(false);
      await loadCategories();
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie:", err);
      setError(t("errors.addingCategory"));
    }
  };

  const handleSelect = async (categoryUuid: string) => {
    try {
      await db.updatePictogram({ uuid: pictogramUuid, categoryUuid } as any);
      onChange(categoryUuid);
      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la catégorie:", err);
      setError(t("errors.updatingCategory"));
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true); 
          loadCategories();
        }}
        className={cn("w-full p-2 flex items-center justify-center gap-2 cursor-pointer rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:shadow-md active:scale-95 transition-all ease-in-out duration-150 bg-zinc-300 dark:bg-zinc-700")}
      >
        <Span className={cn("icon")}>
          {categories.find(cat => cat.uuid === currentCategoryUuid)?.icon || "category"}
        </Span>
        <Span>
          {categories.find(cat => cat.uuid === currentCategoryUuid)?.name || t("pages.settings.noCategory")}
        </Span>
      </Button>

      {showModal && (
        <Div className={cn("fixed inset-0 bg-black/50 z-50 flex items-center justify-center")}>
          <Div className={cn("bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg w-[90%] max-w-md shadow-lg")}>
            <h2 className={cn("text-2xl font-bold mb-4")}>{t("pages.settings.selectCategory")}</h2>
            
            {error && (
              <Div className={cn("mb-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded")}>
                {error}
              </Div>
            )}

            <Div className={cn("flex flex-wrap gap-2 mb-4 max-h-48 overflow-y-auto")}>
              {categories.map((cat) => (
                <Button
                  key={cat.uuid}
                  onClick={() => handleSelect(cat.uuid)}
                  className={cn(
                    "border px-3 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 active:shadow-md active:scale-95 transition-all ease-in-out duration-150",
                    currentCategoryUuid === cat.uuid
                      ? "bg-sky-500 text-sky-50"
                      : "bg-zinc-300 dark:bg-zinc-700"
                  )}
                >
                  <Span className={cn("icon")}>{cat.icon}</Span>
                  <Span>{cat.name}</Span>
                </Button>
              ))}
            </Div>

            <Div className={cn("border-t border-zinc-400 dark:border-zinc-600 pt-4 mt-4")}>
              <h3 className={cn("text-lg font-bold mb-2")}>{t("pages.settings.addCategory")}</h3>
              <input
                placeholder={t("pages.settings.categoryName")}
                className={cn("w-full p-2 mb-2 border-2 border-zinc-500 rounded-sm bg-zinc-100 dark:bg-zinc-900")}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                placeholder={t("pages.settings.categoryIcon")}
                className={cn("w-full p-2 mb-2 border-2 border-zinc-500 rounded-sm bg-zinc-100 dark:bg-zinc-900")}
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
              />
              <Button
                onClick={handleAddCategory}
                className={cn("w-full p-2 bg-sky-500 text-sky-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:shadow-md active:scale-95 transition-all ease-in-out duration-150")}
              >
                {t("pages.settings.add")}
              </Button>
            </Div>

            <Button
              onClick={() => setShowModal(false)}
              className={cn("w-full mt-4 p-2 text-zinc-600 dark:text-zinc-400 underline")}
            >
              {t("pages.settings.close")}
            </Button>
          </Div>
        </Div>
      )}
    </>
  );
}
