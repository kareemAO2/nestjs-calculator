export function ErrorModal({ message }: any) {
  return (
    <div className="bg-red-600 h-20 w-40 text-white absolute top-30 p-2 rounded-xl shadow-2xl">
      {message}
    </div>
  );
}
