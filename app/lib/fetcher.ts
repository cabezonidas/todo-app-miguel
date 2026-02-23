interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface DummyJsonTask {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface DummyJsonResponse {
  todos: DummyJsonTask[];
  total: number;
  skip: number;
  limit: number;
}

export async function getTasks(limit: number = 1000): Promise<Task[]> {
  try {
    const response = await fetch(`https://dummyjson.com/todos?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }

    const data: DummyJsonResponse = await response.json();

    // Transform the API response to match our Task interface
    const tasks: Task[] = data.todos.map((todo) => ({
      id: todo.id.toString(),
      title: todo.todo,
      completed: todo.completed,
    }));

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function getTaskById(id: number): Promise<Task | null> {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch task: ${response.statusText}`);
    }

    const data: DummyJsonTask = await response.json();

    const task: Task = {
      id: data.id.toString(),
      title: data.todo,
      completed: data.completed,
    };

    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
}
