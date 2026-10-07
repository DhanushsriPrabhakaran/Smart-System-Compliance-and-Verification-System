export const publicUser = (u) => ({
  id: u._id, name: u.name, facultyId: u.facultyId, email: u.email, role: u.role,
  designation: u.designation, status: u.status, createdAt: u.createdAt,
  department: u.departmentId && u.departmentId.name
    ? { id: u.departmentId._id, name: u.departmentId.name, programmeCode: u.departmentId.programmeCode } : null,
});
