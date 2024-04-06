import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// function to add residency
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.status(200).send({
      message: "Residency created successfully",
      residency,
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(error.message);
  }
});

// function to get all the documnets/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).send(residencies);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// function to get a particular residency
export const getResidency = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.residency.findUnique({
      where: { id: id },
    });
    res.status(200).send(result);
  } catch (error) {
    res.send(400).send({ message: error.message });
  }
});
