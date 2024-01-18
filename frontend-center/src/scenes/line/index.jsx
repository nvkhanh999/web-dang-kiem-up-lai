//line page

import { Typography, Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";
const Line = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Dự báo số liệu" subtitle="Dự báo số lượng xe đăng kiểm trong tháng tới " />

      <Box height="75vh" paddingTop={5}>
        <Typography variant="h4" color={colors.greenAccent[400]}>
            Lượng xe đăng kiểm trong 10 tháng gần nhất và dự báo tháng sắp tới

        </Typography>
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;