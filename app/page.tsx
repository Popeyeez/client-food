"use client";

import { useEffect, useState } from "react";
import { CategoryType, FoodType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { AdminLayout } from "./_components/AdminLayout";
import { CategorizedFoods } from "./_components/CategorizedFoods";

export default function Page() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const route = useRouter();
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      route.push("/login");
    }
  }, [route]);

  const getCategories = async () => {
    const response = await fetch(
      "https://backend-food-seven.vercel.app/api/categories"
    );
    const data = await response.json();
    setCategories(data.data);
  };

  const getFoods = async () => {
    const res = await fetch("https://backend-food-seven.vercel.app/api/foods");
    const json = await res.json();
    if (Array.isArray(json.data)) {
      setFoods(json.data);
    }
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  return (
    <AdminLayout className="bg-[#404040]">
      <div>
        <img src="BG.png" className="" />
      </div>

      {categories.map((category) => {
        return (
          <CategorizedFoods
            key={category._id}
            refetchFoods={() => getFoods()}
            foods={foods.filter((food) => food.categoryId == category._id)}
            category={category}
          />
        );
      })}
    </AdminLayout>
  );
}
