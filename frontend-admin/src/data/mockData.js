import { tokens } from "../theme";
/* Dữ liệu trong 12 tháng gần nhất về số lượng xe đăng kiểm của từng khu vực*/

export const mockLineData = [
    {
      id: "Miền Bắc",
      color: tokens("dark").greenAccent[500],
      data: [
        {
          x: "T6/22",
          y: 36,
        },
        {
          x: "T7/22",
          y: 216,
        },
        {
          x: "T8/22",
          y: 35,
        },
        {
          x: "T9/22",
          y: 236,
        },
        {
          x: "T10/22",
          y: 88,
        },
        {
          x: "T11/22",
          y: 232,
        },
        {
          x: "T12/22",
          y: 281,
        },
        {
          x: "T1/23",
          y: 1,
        },
        {
          x: "T2/23",
          y: 35,
        },
        {
          x: "T3/23",
          y: 14,
        },
        {
            x:"T4/23(dự báo)",
            y: 20,
        }
      ],
    },
    {
      id: "Miền Trung",
      color: tokens("dark").blueAccent[300],
      data: [
        {
          x: "T6/22",
          y: 270,
        },
        {
          x: "T7/22",
          y: 9,
        },
        {
          x: "T8/22",
          y: 75,
        },
        {
          x: "T9/22",
          y: 175,
        },
        {
          x: "T10/22",
          y: 33,
        },
        {
          x: "T11/22",
          y: 189,
        },
        {
          x: "T12/22",
          y: 97,
        },
        {
          x: "T1/23",
          y: 87,
        },
        {
          x: "T2/23",
          y: 299,
        },
        {
          x: "T3/23",
          y: 251,
        },
        {
            x:"T4/23(dự báo)",
            y: 224,
        }
      ],
    },
    {
      id: "Miền Nam",
      color: tokens("dark").redAccent[200],
      data: [

        {
          x: "T6/22",
          y: 91,
        },
        {
          x: "T7/22",
          y: 190,
        },
        {
          x: "T8/22",
          y: 211,
        },
        {
          x: "T9/22",
          y: 152,
        },
        {
          x: "T10/22",
          y: 189,
        },
        {
          x: "T11/22",
          y: 152,
        },
        {
          x: "T12/22",
          y: 8,
        },
        {
          x: "T1/23",
          y: 197,
        },
        {
          x: "T2/23",
          y: 107,
        },
        {
          x: "T3/23",
          y: 170,
        },
        {
            x:"T4/23(dự báo)",
            y: 160,
        }
      ],
    },
  ];

  export const mockPieData = [
    {
      id: "Xe khách",
      label: "Xe khách",
      value: 239,
      color: "hsl(104, 70%, 50%)",
    },
    {
      id: "Xe bán tải",
      label: "Xe bán tải",
      value: 170,
      color: "hsl(162, 70%, 50%)",
    },
    {
      id: "Xe tải",
      label: "Xe tải",
      value: 322,
      color: "hsl(291, 70%, 50%)",
    },
    {
      id: "Xe con",
      label: "Xe con",
      value: 503,
      color: "hsl(229, 70%, 50%)",
    },
    {
      id: "Xe chuyên dùng",
      label: "Xe chuyên dùng",
      value: 584,
      color: "hsl(344, 70%, 50%)",
    },
  ];

  export const mockRegistry = [
    {
      ID: "01EDSA",
      center: "Trung tâm Hà Nội 1",
      date: "01/04/2023",
    },
    {
      ID: "01EDSA",
      center: "Trung tâm Hà Nội 1",
      date: "01/04/2023",
    },
    {
      ID: "01EDSA",
      center: "Trung tâm Hà Nội 1",
      date: "01/04/2023",
    },
    {
      ID: "01EDSA",
      center: "Trung tâm Hà Nội 1",
      date: "01/04/2023",
    },
    {
      ID: "01EDSA",
      center: "Trung tâm Hà Nội 1",
      date: "01/04/2023",
    },
    {
      ID: "01EDSA",
      center: "Trung tâm Hà Nội 1",
      date: "01/04/2023",
    },
    {
      ID: "01EDSA",
      center: "Trung tâm Hà Nội 1",
      date: "01/04/2023",
    },
    
  ];
  export const carImages = [
	"https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI=",
	"https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960",
	"https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
	"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
	"https://i2-vnexpress.vnecdn.net/2023/05/10/Vios202310jpg-1683690295.jpg?w=750&h=450&q=100&dpr=1&fit=crop&s=BteldbQmWr_H2MzwpRG3DQ",
	"https://i2-vnexpress.vnecdn.net/2022/03/15/toyotacamry2jpeg-1647331125.jpg?w=750&h=450&q=100&dpr=1&fit=crop&s=L-BB3hdAEjvqgmiGZntf1A",
	"https://i2-vnexpress.vnecdn.net/2021/09/18/TopCX53jpg-1631963523.jpg?w=750&h=450&q=100&dpr=1&fit=crop&s=lXg6nHoLLRu59zYrebr90Q",
	"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/VDayRehearsal05052016-28.jpg/1200px-VDayRehearsal05052016-28.jpg"
  ];

 