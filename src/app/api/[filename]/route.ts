import fs from 'fs'
import { NextRequest } from 'next/server'
import path from 'path'

export async function GET(
	req: NextRequest,
) {
	let filePath = ''
	if (req.nextUrl.pathname === '/api/assets_png.zip') {
		filePath = path.resolve('.', '.next/server/chunks/assets_png.zip')
	}
	else if (req.nextUrl.pathname === '/api/assets_svg.zip') {
		filePath = path.resolve('.', '.next/server/chunks/assets_svg.zip')
	}
	else{
		return new Response(undefined, {status: 404})
	}
	const imageBuffer = fs.readFileSync(filePath)

	return new Response(imageBuffer, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, application/zip',
			'Content-Type': 'application/zip',

		},
	})
}
