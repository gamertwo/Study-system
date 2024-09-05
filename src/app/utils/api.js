export async function fetchTasks(filterOptions = {}) {
  const { category, time, date, priority } = filterOptions;
  let url = '/api/tasks';

  if (category) {
    url += `?category=${category}`;
  }

  if (time) {
    url += `${url.includes('?') ? '&' : '?'}time=${time}`;
  }

  if (date) {
    url += `${url.includes('?') ? '&' : '?'}date=${date}`;
  }

  if (priority) {
    url += `${url.includes('?') ? '&' : '?'}priority=${priority}`;
  }

  const response = await fetch(url);
  const tasks = await response.json();
  return tasks;
}

export async function fetchCategories() {
  const response = await fetch('/api/categories');
  const categories = await response.json();
  return categories;
}

export async function addTask(task) {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to add task: ${errorText}`);
  }

  const newTask = await response.json();
  return newTask;
}

export async function toggleTask(id) {
  if (!id) {
    throw new Error('Task ID is undefined');
  }
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'POST',
  });
  const updatedTask = await response.json();
  return updatedTask;
}




export async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}

export async function addCategory(category) {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  const updatedCategories = await response.json();
  return updatedCategories;
}

export async function deleteCategory(categoryId) {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
  const updatedCategories = await response.json();
  return updatedCategories;
}

