const { PrismaClient } = require('@prisma/client');
const prismaMid = new PrismaClient();

prismaMid.$use(async (params, next) => {
  if (params.model === 'Transaction' && params.action === 'create') {
    const userId = params.args.data.UserId;

    const lastTransaction = await prismaMid.transaction.findFirst({
      where: { UserId: userId },
      orderBy: { No: 'desc' },
    });

    const lastNo = lastTransaction ? lastTransaction.No : 0;
    params.args.data.No = lastNo + 1;
  }

  return next(params);
});

module.exports = prismaMid;
