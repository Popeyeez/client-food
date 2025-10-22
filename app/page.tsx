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
    const response = await fetch("http://localhost:4000/api/categories");
    const data = await response.json();
    setCategories(data.data);
  };

  const getFoods = async () => {
    const res = await fetch("http://localhost:4000/api/foods");
    const json = await res.json();

    const foodsArray = json.data || json.foods || json;
    setFoods(foodsArray);
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
