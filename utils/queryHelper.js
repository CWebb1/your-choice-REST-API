const buildPrismaQuery = (query) => {
  const { page = 1, limit = 25, sortBy, sortOrder = "asc", ...filters } = query;

  let prismaQuery = {
    take: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit),
    where: {},
    orderBy: {},
  };

  // Add filters
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      // Handle number fields
      if (!isNaN(filters[key])) {
        prismaQuery.where[key] = parseInt(filters[key]);
      }
      // Handle boolean fields
      else if (
        filters[key].toLowerCase() === "true" ||
        filters[key].toLowerCase() === "false"
      ) {
        prismaQuery.where[key] = filters[key].toLowerCase() === "true";
      }
      // Handle string fields
      else {
        prismaQuery.where[key] = {
          contains: filters[key],
          mode: "insensitive",
        };
      }
    }
  });

  // Add sorting
  if (sortBy) {
    prismaQuery.orderBy[sortBy] = sortOrder.toLowerCase();
  }

  return prismaQuery;
};

export { buildPrismaQuery };
