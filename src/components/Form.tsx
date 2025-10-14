import { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Typography,
  Button,
  Collapse,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Stack,
  Divider,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

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

    if (validValue === 0) {
      setMaxUnavailable(Math.max(1, maxUnavailable));
    }
  }

  function handleMaxUnavailable(value: number) {
    const validValue = Math.min(Math.max(value, 0), nodes);

    setMaxUnavailable(validValue);

    if (validValue === 0) {
      setMaxSurge(Math.max(1, maxSurge));
    }
  }

  return (
    <Box sx={{ maxWidth: 650, margin: '0 auto', mt: 2 }}>
      <Stack spacing={3}>
        {/* Nodes */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ minWidth: 140, fontWeight: 500 }}>
            Nodes:
          </Typography>
          <TextField
            size="small"
            label="# nodes"
            type="number"
            onChange={(e) => handleSetNodes(parseInt(e.target.value))}
            value={nodes}
            autoFocus={true}
            sx={{ flex: 1 }}
          />
          <Typography 
            variant="h6" 
            sx={{ 
              minWidth: 60, 
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            /{getNodeSubnetSize(nodes)}
          </Typography>
        </Box>

        {/* Pods per Node */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ minWidth: 140, fontWeight: 500 }}>
            Pods per Node:
          </Typography>
          <TextField
            size="small"
            label="# pods per node"
            type="number"
            onChange={(e) => setPodsPerNode(parseInt(e.target.value))}
            value={podsPerNode}
            sx={{ flex: 1 }}
          />
          <Typography 
            variant="h6" 
            sx={{ 
              minWidth: 60, 
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            /{getPodsSubnetSize(nodes, podsPerNode)}
          </Typography>
        </Box>

        {/* Services */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ minWidth: 140, fontWeight: 500 }}>
            Services:
          </Typography>
          <TextField
            size="small"
            label="# services"
            type="number"
            onChange={(e) => setServices(parseInt(e.target.value))}
            value={services}
            sx={{ flex: 1 }}
          />
          <Typography 
            variant="h6" 
            sx={{ 
              minWidth: 60, 
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            /{getServicesSubnetSize(services)}
          </Typography>
        </Box>

        <Divider />

        {/* Advanced Options Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            endIcon={showAdvanced ? <ExpandLess /> : <ExpandMore />}
            variant="outlined"
          >
            {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
          </Button>
        </Box>

        {/* Advanced Options */}
        <Collapse in={showAdvanced}>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <Divider />
            
            {/* Max Surge */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Additional node IPs will be required to scale up. Increasing unavailable will cancel some of these off">
                <Typography variant="body1" sx={{ minWidth: 140, fontWeight: 500 }}>
                  Max surge:
                </Typography>
              </Tooltip>
              <TextField
                size="small"
                type="number"
                onChange={(e) => handleMaxSurge(parseInt(e.target.value))}
                value={maxSurge}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Max Unavailable */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ minWidth: 140, fontWeight: 500 }}>
                Max unavailable:
              </Typography>
              <TextField
                size="small"
                type="number"
                onChange={(e) => handleMaxUnavailable(parseInt(e.target.value))}
                value={maxUnavailable}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Private Endpoint */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Keep off if unsure">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={privateEndpoint}
                      onChange={(e) => setPrivateEndpoint(e.target.checked)}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      PSC cluster without private endpoint subnetwork?
                    </Typography>
                  }
                />
              </Tooltip>
            </Box>
          </Stack>
        </Collapse>
      </Stack>
    </Box>
  );
}

export default Form;
