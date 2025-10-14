import { Box, Divider, Link, Typography, Stack } from "@mui/material";

function Footer() {
  return (
    <Box className="footer">
      <Divider sx={{ my: 2 }} />
      <Stack spacing={0.5} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          More information:{" "}
          <Link 
            variant="body2" 
            href="https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips"
            target="_blank"
            rel="noopener noreferrer"
          >
            GCP docs
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Source code:{" "}
          <Link 
            variant="body2" 
            href="https://github.com/d-costa/gke-subnets"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}

export default Footer;
