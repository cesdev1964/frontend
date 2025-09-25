export default function DetailItem({icon,title,value}) {
  return (
    <div className="d-flex gap-3">
      <i className={`${icon} fs-4 mt-2`}></i>
      <div className="d-flex flex-column">
        <div className="text-start text-wrap text-break" style={{ fontSize: "0.8rem" }}>
          {title}
        </div>
        <div className="text-start text-wrap text-break" style={{ fontSize: "0.9rem" }}>
          {value}
        </div>
      </div>
    </div>
  );
}
