/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
// 去拿线
export default function access(initialState: { currentUser?: user | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.userid === 1,
  };
}
