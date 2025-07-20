import axios from 'axios';

const TODOIST_API = 'https://api.todoist.com/rest/v2';
const TODOIST_TOKEN = process.env.NEXT_PUBLIC_TODOIST_TOKEN;

const headers = {
  Authorization: `Bearer ${TODOIST_TOKEN}`,
  'Content-Type': 'application/json',
};

class TaskService {
  static async getAllTasks() {
    try {
      const response = await axios.get(`${TODOIST_API}/tasks`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error retrieving tasks:', error.response?.data || error.message);
      return [];
    }
  }

  static async getTaskById(id) {
    try {
      const response = await axios.get(`${TODOIST_API}/tasks/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error retrieving task ${id}:`, error.response?.data || error.message);
    }
  }

  static async createNewTask(task) {
    try {
      const response = await axios.post(`${TODOIST_API}/tasks`, task, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
    }
  }

  static async updateTask(id, updatedTask) {
    try {
      const response = await axios.post(
        `${TODOIST_API}/tasks/${id}`,
        updatedTask,
        {
          headers: {
            ...headers,
            'X-Request-Id': `${Date.now()}-${id}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error.response?.data || error.message);
    }
  }

  static async deleteTask(id) {
    try {
      await axios.delete(`${TODOIST_API}/tasks/${id}`, { headers });
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error.response?.data || error.message);
    }
  }
}

export default TaskService;
