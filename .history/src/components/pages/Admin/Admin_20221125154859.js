import React from 'react'

const Admin = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <section>
          <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
            <span className="tracking-widest text-slate-900 font-semibold uppercase ">
              All Users
            </span>
          </div>
        </section>
        <Table
          striped
          bordered
          hover
          style={{
            marginTop: "5%",
            scrollBehavior: "smooth",
            overflow: "scroll",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th> Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((i, index) => (
              <tr key={index}>
                <td>{i.name}</td>
                <td>{i.phone}</td>
                <td>{i.email}</td>
                <td>{i.role}</td>
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {" "}
                    <AiOutlineEdit
                      color="black"
                      cursor="pointer"
                      onClick={() => setModalShow(true)}
                    />
                    <AiFillDelete color="red" cursor="pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };
  

export default Admin