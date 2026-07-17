in prisma runs on node js runtime
and middleware runs on edge time so cant be used in same file...
otherwise error
so separate auth.ts bcoz it uses prisma and used by middleware thus forcing prisma to run on edge time

