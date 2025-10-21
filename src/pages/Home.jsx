
import { useTitle } from "../hooks/useTitle";
import EmployeeCard from "../components/home/EmployeeCard";
import AnnouncementCard from "../components/home/AnnouncementCard";



export default function Home({ title }) {
  useTitle(title);


  return (
    <div>
      <div className="flex-grow-1 d-flex align-items-start justify-content-center">
        <div className="row w-100 gy-4 mt-2">
          <div className="col-md-12 col-lg-6">
            <EmployeeCard/>
          </div>
          <div className="col-md-12 col-lg-6">
            <AnnouncementCard/>
          </div>
        </div>
      </div>
    </div>
  );
}
