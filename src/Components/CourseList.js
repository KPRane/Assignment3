import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Form,
  Toast,
} from "react-bootstrap";
import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:3001/courses",
});
const clientuser = axios.create({
  baseURL: "http://localhost:3001/user",
});
export default function CourseList() {
  const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const regForName =  RegExp(/^[a-zA-Z]{2,100}$/);
  const regForMobilenum = RegExp(/^[6-9][0-9]{9}$/);
  const [course, setcourse] = useState({ courseData: [] });
  const FullName = useRef(null);
  const Email = useRef(null);
  const MobileNumber = useRef(null);
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [MobileNumberError, setMobileNumberError] = useState("");
  const [SelectedCourse, setSelectedCourse] = useState("");
  const [form, setform] = useState(false);
  useEffect(() => {
    client.get().then((res) => {
      console.log(res.data);
      setcourse({ ...course, courseData: res.data });
    });
    console.log(course.courseData);
  }, []);

  const handler = (event) => {
    const name = event.target.name;
    switch (name) {
      case "Fullname":
        const checkfullname = regForName.test(FullName.current.value)
          ? ""
          : "Only Alphabhet allowd";
        setNameError(checkfullname);
        break;
      case "email":
        const checkemail = regForEmail.test(Email.current.value)
          ? ""
          : "Enter Valid Email ";
        setEmailError(checkemail);
        break;
      case "mobilenumber":
        const checkmobileno = regForMobilenum.test(MobileNumber.current.value)
          ? ""
          : "Enter valid Mobile No";
        setMobileNumberError(checkmobileno);
        break;
      default:
        break;
    }
  };

  const Enquire = (key) => {
    console.log(key);
    setform(true);
    setSelectedCourse(key);
  };

  const submit = () => {
    console.log(SelectedCourse);
    let SelectedCourseName;
    course.courseData.forEach((element) => {
      if (element.courses_id == SelectedCourse) {
        SelectedCourseName = element.courses_name;
      }
    });
    if (
      FullName.current.value != "" &&
      Email.current.value != "" &&
      MobileNumber.current.value != "" &&
      NameError == "" &&
      EmailError == "" &&
      MobileNumberError == ""
    ) {
      const formData = {
        id: Math.random(),
        Name: FullName.current.value,
        Email: Email.current.value,
        MobileNumber: MobileNumber.current.value,
        CourseId: SelectedCourse,
        CourseName: SelectedCourseName,
      };
      console.log(formData);
      clientuser.post("/", formData);
      setform(false);
    } else {
      alert("Please Fill the form");
    }
  };

  return (
    <div>
      <Container>
        {form ? (
          
          <Col lg={12} >
           
            <Row>
              <Col lg={2} />
              <Col lg={8}>
               <Card className="mt-5 bg-light">
                  <Card.Body>
                  <h2 className="display-4 text-center">ENQUIRY FORM</h2>
                    <Form>
                      <Form.Group className="mb-2"  controlId="frombasicName" >
                      <Form.Label className="float-left"> NAME:  </Form.Label>
                        <Form.Control type="text" name="Fullname" placeholder="Enter Full Name" onChange={handler}  ref={FullName} />
                      </Form.Group> {NameError ? (
                        <Toast><Toast.Body className="text-danger"> {NameError}  </Toast.Body> </Toast> ) : (   "" )}
                      <Form.Group className="mb-2" controlId="frombasicEMail" >
                        <Form.Label className="float-left"> {" "} EMAIL: </Form.Label>
                        <Form.Control type="text" name="email" placeholder="Enter Email" onChange={handler} ref={Email}/>
                      </Form.Group>
                      {EmailError ? (
                        <Toast> <Toast.Body className="text-danger"> {EmailError} </Toast.Body></Toast> ) : (
                        ""
                      )}
                      <Form.Group className="mb-2" controlId="frombasicMobileNumber" >
                        <Form.Label className="float-left ">
                         PHONE NO:
                        </Form.Label>
                        <Form.Control type="text" name="mobilenumber"  placeholder="Enter phone no" onChange={handler}  ref={MobileNumber}/>
                      </Form.Group>
                      {MobileNumberError ? (
                        <Toast>
                          <Toast.Body className="text-danger"> {MobileNumberError} </Toast.Body>
                        </Toast>
                      ) : (
                        ""
                      )}
                      <Button variant="outline-dark" onClick={submit}>
                        Submit
                      </Button>{" "}
                    </Form>
                  </Card.Body>
                </Card>
                <br />
              </Col>
            </Row>
          </Col>
        ) : (
          ""
        )}
        <Container>
          {course.courseData.map((Course) => (
            <Col lg={12} key={Course.courses_id} >
              <Card lg={12} className="p-2">
                <Card.Img variant="top" src={Course.image} height="200px" />
                <Card.Body>
                  <Card.Text> COURSE NAME:{Course.courses_name}</Card.Text>
                  <Card.Text>PRICE:{Course.price}</Card.Text>
                  <Card.Text> DESCRIPTION:{Course.Description}</Card.Text>
                   <Button variant="outline-info" onClick={() => Enquire(Course.courses_id)}>ENQUIRE
                    </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Container>


      </Container>
    </div>
  );
}
