export default function UseCard({ img, title, points }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
      <img src={img} alt={title} className="h-48 w-full object-cover" />
      <div className="p-6">
        <h4 className="text-xl font-bold mb-4">{title}</h4>
        <ul className="space-y-2 text-gray-600">
          {points.map((p, i) => (
            <li key={i}>• {p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
