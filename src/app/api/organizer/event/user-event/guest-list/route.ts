import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const eventId = parseInt(searchParams?.get('eventId'))

  const event = await prisma.suKien.findFirst({
    include: {
      ves: {
        include: {
            HoaDon: {
                include: {
                    HoaDonVe: true,
                    user: true
                },
            }
        }
      },
      ChuDe: true
    },
    where: {
      id:{
        equals: eventId,
      },
    }
  });
  return new Response(JSON.stringify(event), { status: 200 });
}