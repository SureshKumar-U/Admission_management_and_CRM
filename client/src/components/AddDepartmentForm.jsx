function DepartmentForm({ institutions }) {
  const [form, setForm] = useState({
    institution: "",
    name: "",
    code: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.institution) err.institution = "Select institution";
    if (!form.name) err.name = "Name required";
    if (!form.code) err.code = "Code required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await API.post("/departments", form);
  };

  return (
    <>
      <select onChange={e => setForm({ ...form, institution: e.target.value })}>
        <option value="">Select Institution</option>
        {institutions.map(i => (
          <option key={i._id} value={i._id}>{i.name}</option>
        ))}
      </select>
      {errors.institution && <p className="text-red-500 text-xs">{errors.institution}</p>}
    </>
  );
}