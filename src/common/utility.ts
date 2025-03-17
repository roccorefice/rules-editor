export const forceTableReload = () => {
  window.history.back();
  setTimeout(() => {
    window.history.forward();
  }, 100);
};
