import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//     status: string;
//     message: string;
// };

// export default function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<ResponseData>
// ) {
//     if (req.method !== "POST") {
//         return res
//             .status(405)
//             .json({ status: "error", message: "Method not allowed" });
//     }

//     // You can access submitted data here
//     const { name, email, phone, propertyValue, monthlySalary } = req.body;
//     console.log("REQ BODY:", req.body);


//     // console.log(name)
//     // console.log(email)
//     // console.log(phone)
//     // console.log(propertyValue)
//     // console.log(monthlySalary)

//     return res.status(200).json({
//         status: "success",
//         message: "Lead received",
//     });
// }


import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    console.log("BODY:", body);

    return NextResponse.json({
        status: "success",
        message: "Lead received",
    });
}
