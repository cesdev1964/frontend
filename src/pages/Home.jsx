import { useTitle } from "../hooks/useTitle";
import EmployeeCard from "../components/home/EmployeeCard";
import AnnouncementCard from "../components/home/AnnouncementCard";
import OTRequestPendingCard from "../components/home/OTRequestPendingCard";
import { useAuth } from "../auth/AuthContext";

export default function Home({ title }) {
  const { authdata} = useAuth();
  const rolePermissionRequire = authdata?.roles ?? [];

  useTitle(title);
  const token = localStorage.getItem("access_token");
  if (!token) {
    window.location.reload();
    localStorage.clear();
  }
  return (
    <div>
      <div className="flex-grow-1 d-flex align-items-start justify-content-center">
        <div className="row w-100 gy-4 mt-2">
          <div className="col-md-12 col-lg-6">
            <EmployeeCard />
            {rolePermissionRequire.includes("SUPER") && (<OTRequestPendingCard/>)}
          </div>
          <div className="col-md-12 col-lg-6">
            <AnnouncementCard />
          </div>
        </div>
      </div>
    </div>
  );
}
