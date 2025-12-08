export default function DetailItem({icon,title,value}) {
  return (
    <div className="d-flex gap-3 mb-3 ps-2">
      <i className={`${icon} fs-4 mt-2 text-danger`}></i>
       <div className="d-flex flex-column">
        <div className="text-start text-wrap text-danger" style={{ fontSize: "0.8rem" }}>
          {title}
        </div>
        <div className="text-start text-wrap" style={{ fontSize: "0.9rem" }}>
          {value}
        </div>
      </div>
    </div>
  );
}
