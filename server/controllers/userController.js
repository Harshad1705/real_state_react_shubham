import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// function to create new user
export const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExisted = await prisma.user.findUnique({ where: { email: email } });

  if (!userExisted) {
    const user = await prisma.user.create({ data: req.body });
    res.status(200).json({
      message: "User registered successfully",
      user: user,
    });
  } else {
    res.status(201).send({ message: "User already registered" });
  }
});

// function to book a visit to residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;
  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .send({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.status(200).send({ message: "Your visit is booked successfully" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// function to get all bookings of a user
export const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// function to cancel a booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send({ message: "Booking cancelled successfully" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// function to add a residency in favourite list of user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all the favourate
export const getAllFavourites = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const favResd = await prisma.user.findUnique({
      where: { email: email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResd);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
