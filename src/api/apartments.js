const BASE_URL = "https://api.real-estate-manager.redberryinternship.ge/api";

const token = "a1a4a431-73fe-43e4-af37-3af7cea8f2e5";

// Get all cities
export async function getCities() {
  try {
    const res = await fetch(`${BASE_URL}/cities`);

    if (!res.ok) {
      throw new Error("Can't fetch cities !!!");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// get all regions
export async function getRegions() {
  try {
    const res = await fetch(`${BASE_URL}/regions`);

    if (!res.ok) {
      throw new Error("Can't fetch regions !!!");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// get all agents
export async function getAgents() {
  try {
    const res = await fetch(`${BASE_URL}/agents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Can't fetch agents");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// create agent
export async function createAgent(param) {
  try {
    const res = await fetch(`${BASE_URL}/agents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: param,
    });

    if (!res.ok) {
      throw new Error("Can't create agent");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// get all apartments
export async function getApartments() {
  try {
    const res = await fetch(`${BASE_URL}/real-estates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Can't fetch apartments");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// crate apartment
export async function createApartment(param) {
  try {
    const res = await fetch(`${BASE_URL}/real-estates`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: param,
    });

    if (!res.ok) {
      throw new Error("Can't create apartment");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// get apartment by id
export async function getApartment(id) {
  try {
    const res = await fetch(`${BASE_URL}/real-estates/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Can't fetch apartment");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// delete apartment
export async function deleteApartment(id) {
  try {
    const res = await fetch(`${BASE_URL}/real-estates/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Can't delete apartment");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}