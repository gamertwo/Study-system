import { connectToDB, fetchCategories, createCategory } from "../../utils/db";

export async function GET(request) {
  await connectToDB();
  const categories = await fetchCategories();
  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  await connectToDB();
  const { name } = await request.json();
  const newCategory = await createCategory(name);
  return new Response(JSON.stringify(newCategory), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
