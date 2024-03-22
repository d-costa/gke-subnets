// React component with two input values

import { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
// import Latex from "react-latex-next";

function Form() {
  const [nodes, setNodes] = useState(3);
  const [podsPerNode, setPodsPerNode] = useState(16);
  const [services, setServices] = useState(10);

  const LARGEST_SUBNET_SIZE_NODES = 8;
  const SMALLEST_SUBNET_SIZE_NODES = 29;

  const LARGEST_SUBNET_SIZE_PODS = 9;
  const SMALLEST_SUBNET_SIZE_PODS = 24;

  const LARGEST_SUBNET_SIZE_SERVICES = 16;
  const SMALLEST_SUBNET_SIZE_SERVICES = 28;

  function getNodeSubnetSize(nodes: number) {
    const size = 32 - Math.ceil(Math.log2(nodes + 4));
    return Math.min(
      SMALLEST_SUBNET_SIZE_NODES,
      Math.max(size, LARGEST_SUBNET_SIZE_NODES)
    );
  }

  function getPodsSubnetSize(nodes: number, podsPerNode: number) {
    const size = 31 - Math.ceil(Math.log2(nodes * podsPerNode));
    return Math.min(
      SMALLEST_SUBNET_SIZE_PODS,
      Math.max(size, LARGEST_SUBNET_SIZE_PODS)
    );
  }

  function getServicesSubnetSize(services: number) {
    const size = 32 - Math.ceil(Math.log2(services));
    return Math.min(
      SMALLEST_SUBNET_SIZE_SERVICES,
      Math.max(size, LARGEST_SUBNET_SIZE_SERVICES)
    );
  }

  return (
      <Table aria-label="simple table" className="main-table">
        <TableBody className="main-container">
          <TableRow>
            <TableCell align="left">
              <Typography>Nodes:</Typography>
            </TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                label="# nodes"
                type="number"
                onChange={(e) => setNodes(parseInt(e.target.value))}
                value={nodes}
                autoFocus={true}
              ></TextField>
            </TableCell>
            <TableCell align="left">
              <Typography>/{getNodeSubnetSize(nodes)}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography>Pods per Node:</Typography>
            </TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                label="# pods per node"
                type="number"
                onChange={(e) => setPodsPerNode(parseInt(e.target.value))}
                value={podsPerNode}
              ></TextField>
            </TableCell>
            <TableCell align="left">
              <Typography>/{getPodsSubnetSize(nodes, podsPerNode)}</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography>Services:</Typography>
            </TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                label="# services"
                type="number"
                onChange={(e) => setServices(parseInt(e.target.value))}
                value={services}
              ></TextField>
            </TableCell>
            <TableCell align="left">
              <Typography>/{getServicesSubnetSize(services)}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
}

export default Form;
