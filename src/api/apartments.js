const BASE_URL = "https://api.real-estate-manager.redberryinternship.ge/api";
const token = "a1a4a431-73fe-43e4-af37-3af7cea8f2e5";

const headers = {
  Authorization: `Bearer ${token}`,
};

function throwError(response) {
  if (!response.ok) {
    throw new Error("Can't fetch cities !!!");
  }
}

// Get all cities
export async function getCities() {
  const res = await fetch(`${BASE_URL}/cities`);

  throwError(res);

  return res.json();
}

// get all regions
export async function getRegions() {
  const res = await fetch(`${BASE_URL}/regions`);

  throwError(res);

  return res.json();
}

// get all agents
export async function getAgents() {
  const res = await fetch(`${BASE_URL}/agents`, {
    method: "GET",
    headers: headers,
  });

  throwError(res);

  return res.json();
}

// create agent
export async function createAgent(param) {
  const res = await fetch(`${BASE_URL}/agents`, {
    method: "POST",
    headers: headers,
    body: param,
  });

  throwError(res);

  return res.json();
}

// get all apartments
export async function getApartments() {
  const res = await fetch(`${BASE_URL}/real-estates`, {
    method: "GET",
    headers: headers,
  });

  throwError(res);

  return res.json();
}

// crate apartment
export async function createApartment(param) {
  const res = await fetch(`${BASE_URL}/real-estates`, {
    method: "POST",
    headers: headers,
    body: param,
  });

  throwError(res);

  return await res.json();
}

// get apartment by id
export async function getApartment(id) {
  const res = await fetch(`${BASE_URL}/real-estates/${id}`, {
    method: "GET",
    headers: headers,
  });

  throwError(res);

  return res.json();
}

// delete apartment
export async function deleteApartment(id) {
  const res = await fetch(`${BASE_URL}/real-estates/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  throwError(res);

  return res.json();
}
