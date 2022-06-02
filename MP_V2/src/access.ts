/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
// export default function access(initialState: { currentUser?: user | undefined }) {
//   const { currentUser } = initialState || {};
//   return {
//     canAdmin: currentUser && currentUser.userid === 1,
//   };
// }
export default function access(initialState: { currentUser?: user | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.admin === 1,
  };
}
