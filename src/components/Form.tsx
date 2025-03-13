import { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
  Collapse,
  Tooltip,
  Checkbox,
} from "@mui/material";

function Form() {
  const [nodes, setNodes] = useState(3);
  const [podsPerNode, setPodsPerNode] = useState(16);
  const [services, setServices] = useState(10);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [maxSurge, setMaxSurge] = useState(0);
  const [maxUnavailable, setMaxUnavailable] = useState(1);
  const [privateEndpoint, setPrivateEndpoint] = useState(false);

  const LARGEST_SUBNET_SIZE_NODES = 8;
  const SMALLEST_SUBNET_SIZE_NODES = 29;

  const LARGEST_SUBNET_SIZE_PODS = 9;
  const SMALLEST_SUBNET_SIZE_PODS = 24;

  const LARGEST_SUBNET_SIZE_SERVICES = 16;
  const SMALLEST_SUBNET_SIZE_SERVICES = 28;

  function getNodeSubnetSize(nodes: number) {
    const extraNeeded = Math.max(maxSurge - maxUnavailable, 0);
    const unusable = 4;

    const size = 32 - Math.ceil(Math.log2(nodes + extraNeeded - (privateEndpoint ? 1 : 0) + unusable));

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

  function handleSetNodes(value: number) {
    const validValue = Math.max(1, value);
    setNodes(validValue);
  }

  function handleMaxSurge(value: number) {
    const validValue = Math.min(Math.max(value, 0), nodes);
    setMaxSurge(validValue);

    if (validValue == 0) {
      setMaxUnavailable(Math.max(1, maxUnavailable));
    }
  }

  function handleMaxUnavailable(value: number) {
    const validValue = Math.min(Math.max(value, 0), nodes);

    setMaxUnavailable(validValue);

    if (validValue == 0) {
      setMaxSurge(Math.max(1, maxSurge));
    }
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
              onChange={(e) => handleSetNodes(parseInt(e.target.value))}
              value={nodes}
              autoFocus={true}
            />
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
            />
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
            />
          </TableCell>
          <TableCell align="left">
            <Typography>/{getServicesSubnetSize(services)}</Typography>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={3} align="center">
            <Button onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? "Hide Advanced" : "Show Advanced"}
            </Button>
          </TableCell>
        </TableRow>

        <Collapse in={showAdvanced}>

          <TableRow>
            <TableCell align="left">
              <Tooltip title="Additional node IPs will be required to scale up. Increasing unavailable will cancel some of these off">
                <Typography>Max surge:</Typography>
              </Tooltip>
            </TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                type="number"
                onChange={(e) => handleMaxSurge(parseInt(e.target.value))}
                value={maxSurge}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography>Max unavailable:</Typography>
            </TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                type="number"
                onChange={(e) => handleMaxUnavailable(parseInt(e.target.value))}
                value={maxUnavailable}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Tooltip title="Keep off if unsure">
                <Typography>PSC cluster without private endpoint subnetwork?</Typography>
              </Tooltip>
            </TableCell>
            <TableCell align="left">
              <Checkbox
                checked={privateEndpoint}
                onChange={(e) => setPrivateEndpoint(e.target.checked)}
              />
            </TableCell>
          </TableRow>

        </Collapse>

      </TableBody>
    </Table>
  );
}

export default Form;
