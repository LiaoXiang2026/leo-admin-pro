import { describe, expect, it } from 'vitest';

import {
  createUser,
  deleteUser,
  getUserList,
  updateUser,
} from './user';

describe('user mock api', () => {
  it('filters and paginates users', async () => {
    const result = await getUserList({
      page: 1,
      pageSize: 1,
      username: 'admin',
    });

    expect(result.total).toBe(1);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.username).toBe('admin');
  });

  it('creates, updates, and deletes a user', async () => {
    const created = await createUser({
      username: 'tester',
      nickname: '测试',
      email: 'tester@example.com',
      phone: '13800138009',
      roleId: 2,
      roleName: '普通用户',
    });

    expect(created.username).toBe('tester');

    const updated = await updateUser(created.id, {
      nickname: '已更新',
      status: 0,
    });

    expect(updated).toBeDefined();
    if (!updated) {
      throw new Error('Expected created user to exist after update');
    }
    expect(updated.nickname).toBe('已更新');
    expect(updated.status).toBe(0);

    await expect(deleteUser(created.id)).resolves.toBe(true);
    await expect(deleteUser(created.id)).rejects.toThrow('User not found');
  });
});
