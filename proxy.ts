import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, getUserData } from "@/lib/cookie";

const publicPaths = ['/admin_login', '/donor_login', '/volunteer_login', '/donor_register', '/volunteer_register', '/forget-password'];
const adminPaths = ['/admin'];
const donorPaths = ['/donor'];
const volunteerPaths = ['/volunteer'];
const userPaths = ['/user'];

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = await getAuthToken();
    const user = token ? await getUserData() : null;

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    const isAdminPath = adminPaths.some(path => pathname.startsWith(path));
    const isDonorPath = donorPaths.some(path => pathname.startsWith(path));
    const isVolunteerPath = volunteerPaths.some(path => pathname.startsWith(path));
    const isUserPath = userPaths.some(path => pathname.startsWith(path));
    
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/donor_login', req.url));
    }

    if (token && user) {
        if (isAdminPath && user.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }
        if (isDonorPath && user.role !== 'donor' && user.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }
        if (isVolunteerPath && user.role !== 'volunteer' && user.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }
        // User routes - all authenticated users
        if (isUserPath && user.role !== 'admin' && user.role !== 'donor' && user.role !== 'volunteer') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    if (isPublicPath && token && user) {
        // Redirect authenticated users to their respective dashboards
        if (user.role === 'admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        } else if (user.role === 'donor') {
            return NextResponse.redirect(new URL('/user/donor/dashboard', req.url));
        } else if (user.role === 'volunteer') {
            return NextResponse.redirect(new URL('/user/volunteer/dashboard', req.url));
        }
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/donor/:path*',
        '/volunteer/:path*',
        '/admin_login',
        '/donor_login',
        '/volunteer_login',
        '/donor_register',
        '/volunteer_register'
    ]
}
