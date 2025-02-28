import { Task } from '.';

export default {
  title: 'Task',
  component: Task,
};

export const Default = {
  args: {
    title: 'Test Task',
  },
};

export const Pinned = {
  args: { title: 'Test Task Pinned' },
};

export const Archived = {
  args: { title: 'Test Task Archived' },
};
