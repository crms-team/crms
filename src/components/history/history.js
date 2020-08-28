import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import "./history.css"

class Logtable extends Component{
    render(){
        return(
            <>
                <div className="logtable">
                    <Paper>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>사진</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>생년월일</TableCell>
                            <TableCell>성별</TableCell>
                            <TableCell>직업</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                        </Table>
                    </Paper>
                </div>
            </>
        )
    }
}

export default Logtable