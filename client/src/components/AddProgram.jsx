function ProgramForm({ institutions, departments }) {
  const [form, setForm] = useState({
    institution: "",
    department: "",
    name: "",
    code: "",
    courseType: "UG",
    entryType: "Regular",
    academicYear: "",
    totalIntake: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.institution) err.institution = "Required";
    if (!form.department) err.department = "Required";
    if (!form.name) err.name = "Required";
    if (!form.totalIntake) err.totalIntake = "Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await API.post("/programs", form);
  };

  return (
    <div className="grid gap-3">
      <input placeholder="Program Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Total Intake" type="number" onChange={e => setForm({...form, totalIntake: e.target.value})}/>
      {errors.totalIntake && <p className="text-red-500 text-xs">{errors.totalIntake}</p>}
    </div>
  );
}

export default ProgramForm