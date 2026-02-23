export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export async function getTodos(): Promise<TodosResponse> {
  try {
    const response = await fetch('https://dummyjson.com/todos', {
      cache: 'no-store', // For always fresh data, use 'force-cache' for static data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    const data: TodosResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}
