import { useEffect, useState } from 'react';
import axios from 'axios';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = JSON.parse(localStorage.getItem('userInfo'))?.data?.token;

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8000/api/v1/programs', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res?.data?.data;
        setPrograms(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [token]);

  if (loading) return <div className="p-5">Loading programs...</div>;
  if (error) return <div className="p-5 text-red-600">Error: {error}</div>;


  console.log("Fetched programs:", programs);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Programs & Quotas</h1>
        <span className="text-sm text-gray-500">Total programs: {programs.length}</span>
      </div>

      {programs.length === 0 && <div className="text-gray-500">No programs found.</div>}

      <div className="grid gap-4">
        {programs.map((prog) => {
          const quotas = prog.quotas || prog.quota || [];
          const quotaItems = Array.isArray(quotas)
            ? quotas
            : Object.entries(quotas || {}).map(([name, qs]) => ({ name, ...qs }));

          return (
            <div key={prog._id || prog.id || prog.code || prog.name} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-lg">{prog.name || prog.program || 'Untitled Program'}</h2>
                  <p className="text-sm text-gray-600">Code: {prog.code || prog.programCode || 'N/A'}</p>
                </div>
                <div className="text-xs text-indigo-600 font-medium">{prog.courseType || prog.entryType || ''}</div>
              </div>

              <div className="mt-4 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-gray-600 mb-2">
                  <span>Total Intake</span>
                  <span>{prog.totalIntake ?? prog.intake ?? 'N/A'}</span>
                  <span>Academic Year</span>
                  <span>{prog.academicYear || '-'}</span>
                </div>
              </div>

              <div className="mt-3 border-t border-gray-200 pt-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Quota Details</h3>
                {quotaItems.length === 0 ? (
                  <div className="text-gray-500">No quota data available.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {quotaItems.map((q) => {
                      const filled = Number(q.filled ?? 0);
                      const total = Number(q.total ?? 0);
                      const percent = total ? Math.round((filled / total) * 100) : 0;
                      const remaining = total - filled;
                      const barColor = percent >= 100 ? 'bg-red-500' : percent >= 70 ? 'bg-amber-500' : 'bg-green-500';

                      return (
                        <div key={q.name} className="border rounded p-2">
                          <div className="font-semibold text-xs uppercase tracking-wider text-gray-600">{q.name}</div>
                          <div className="text-lg font-bold">{filled} / {total}</div>
                          <div className="text-xs text-gray-500">Remaining: {remaining >= 0 ? remaining : 0}</div>
                          <div className="w-full h-2 bg-gray-200 rounded mt-2 overflow-hidden">
                            <div className={`${barColor} h-full`} style={{ width: `${Math.min(percent, 100)}%` }} />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{percent}% filled</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Programs;
