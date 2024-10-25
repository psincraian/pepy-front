export const getDownloadColor = (downloads: number) => {
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"];
  let index = 0;
  while (downloads > 100 && index < colors.length - 1) {
    downloads /= 100;
    index++;
  }

  return colors[index];
};