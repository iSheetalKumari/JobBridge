import JobRows from "./JobRows";

export default function Jobs(){
    return (
        <div className="bg-slate-200 p-8 rounded-3xl">
            <h2 className="font-bold mb-4">Recent Jobs</h2>
            <div className="flex flex-col gap-4">
              <JobRows/>
              <JobRows/>
              <JobRows/>
              <JobRows/>
              <JobRows/>
            </div>
            
        </div>
    );
}