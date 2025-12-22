const HeaderPage=({pageName})=>{
  return(
   <div className="mb-4 ms-3">
     <div className="text-start">
      <div style={{color:"var(--sidebar-text)",fontSize:"20px"}} className="headerName">
        <span style={{color:"var(--pink)",fontSize:"20px"}} className="fw-bold">#</span> {pageName}</div>
     </div>
     <div className="border-top border-danger my-2"></div>
   </div>
  );
}
export default HeaderPage;