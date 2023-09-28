type GetParams = {
  params: {
    filename: string;
  };
};

// export an async GET function. This is a convention in NextJS
export async function GET(req: Request, { params }: GetParams) {
  // filename for the file that the user is trying to download
  const filename = params.filename;

  // external file URL
  const DUMMY_URL =
    "http://localhost:3000/_next/static/media/icon.c30659c0.png";

  // use fetch to get a response
  const response = await fetch(DUMMY_URL);

  // return a new response but use 'content-disposition' to suggest saving the file to the user's computer
  return new Response(response.body, {
    headers: {
      ...response.headers, // copy the previous headers
      "content-disposition": `attachment; filename="${filename}"`,
    },
  });
}
