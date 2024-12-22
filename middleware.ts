import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token: any = await getToken({ req })
    const url = req.nextUrl.clone()

    if (!token && url.pathname !== "/") {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if (token && token.isNewUser == true && url.pathname == "/dashboard") {
        url.pathname = "/register";
        return NextResponse.redirect(url);
    }

    if (token && url.pathname === "/") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    if (token && token.isNewUser == false && url.pathname === "/register") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard", "/register"],
};
