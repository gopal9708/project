import React ,{useState} from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Button, Form, Col, Row, Label } from 'reactstrap';
import ColumnFilter from '../../../../components/listDisplay/columnfilter/ColumnFilter';
import ReportDataList from '../../../../components/listDisplay/ReportDatalist/ReportDataList';
import SearchList from '../../../../components/listDisplay/searchList/SearchList';
import PageTitle from '../../../../components/pageTitle/PageTitle';
import Title from '../../../../components/title/Title';

const WeightDiffReport = () => {
    const [selected_report_columns, setselected_report_columns] = useState([]);
    const [column_list, setcolumn_list] = useState([]);
    const [branches_list, setbranches_list] = useState([]);
    const [branch, setbranch] = useState([]);
    const [from_date, setfrom_date] = useState("");
    const [to_date, setto_date] = useState("");
    const [selected_details_report_data, setselected_details_report_data] =
    useState([]);
    return(
        <div>
            <PageTitle page="Weight Difference Report" />
            <Title title="Weight Difference Report" parent_title="Analytics" />
            <div className="mx-3">
                <div className="container-fluid " style={{ background: "white" }}>
                    {/* Toolbar Section */}
                    <div className="mb-2 row ">
                        <div className=" mt-3 col-sm-4">
                            <SearchList />
                        </div>
                        <div className="col-sm-8">
                            <div className="text-sm-end">
                                {/* Add Branch Navigation Button */}
                                <span className=" mb-2 me-2 mt-3 btn ">
                                    <ColumnFilter 
                                        column_list={column_list}
                                        selected_data={selected_report_columns}
                                        setselected_data={setselected_report_columns}
                                    />
                                </span>
                                <Button 
                                    type="button"
                                    className="btn-rounded fluid mb-2 me-2 mt-3 btn btn-success"
                                >
                                    Download Report
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Form>
                            <Col lg={12} md={12} sm={12}>
                            <Row >
                                {/* Select Branch */}
                                <Col lg={3} md={4} sm={6}>
                                    <div className="mb-3">
                                        <Label className="header-child">Select Branch:</Label>
                                        <MultiSelect 
                                            options={branches_list.map((branch) => ({
                                                label: `${branch.label}`,
                                                value: `${branch.value}`,
                                              }))}
                                              value={branch}
                                              onChange={setbranch}
                                              labelledBy="Select "
                                              error_message="Select Branch"
                                        />
                                    </div>
                                </Col>
                                {/* From Date */}
                                <Col lg={3} md={4} sm={6}>
                                    <div className="mb-3">
                                        <Label className="header-child">From:</Label>
                                        <input 
                                        type="date"
                                        className="form-control d-block form-control-md "
                                        value={from_date}
                                           onChange={(val) => {
                                             setfrom_date(val.target.value);
                                           }}
                                           error_message="Select From Date"
                                        />
                                    </div>
                                </Col>
                                {/* To Date */}
                                <Col lg={3} md={4} sm={6}>
                                <div className="mb-3">
                                    <Label className="header-child">To:</Label>
                                    <input 
                                        type="date"
                                        className="form-control d-block form-control-md "
                                        value={to_date}
                                        onChange={(val) => {
                                          setto_date(val.target.value);
                                        }}
                                    />
                                </div>
                                </Col>
                                {/* Submit Button */}
                                <Col lg={3} md={4} sm={6}>
                                    <div className="mb-2">
                                        <Label></Label>
                                        <div style={{ height: "10%", paddingTop: "12px" }}>
                                            <Button 
                                            // onClick={submit_data} 
                                            type="Button"
                                            className="btn btn-info"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            </Col>        
                        </Form>
                    </div>
                    {/* DataTable */}
                    <ReportDataList 
                    Data_Title={selected_report_columns}
                    Data_Format={selected_details_report_data}
                    />
                    <span>No Data Found</span>
                </div>
            </div>
        </div>
    )
}

export default WeightDiffReport;