import React from "react";
import {Box, Container, Row, Column, FooterLink, Heading,} from "./FooterStyles";

const Footer = () => {
return (
	<Box>
	<h3 style={{ color: "#6CC073",
				textAlign: "center",
				marginTop: "-50px",
        marginBottom: "10px" }}>
		ProShop: One-stop website for all your needs !
	</h3>
	<Container>
		<Row>
		<Column>
			<Heading>Information</Heading>
			<FooterLink href="#">About Us</FooterLink>
			<FooterLink href="#">Terms & Conditions</FooterLink>
			<FooterLink href="#">Private Policy</FooterLink>
		</Column>
		<Column>
			<Heading>Categories</Heading>
			<FooterLink href="#">Electronics</FooterLink>
			<FooterLink href="#">TVs & Appliances</FooterLink>
			<FooterLink href="#">Home & Furniture</FooterLink>
			<FooterLink href="#">Sports, Books & More</FooterLink>
		</Column>
		<Column>
			<Heading>Contact Us</Heading>
			<FooterLink href="#">New Delhi, India - 110085</FooterLink>
			<FooterLink href="#">011 2789374892</FooterLink>
			<FooterLink href="#">info@mail.com</FooterLink>
		</Column>
		<Column>
			<Heading>Social Media</Heading>
			<FooterLink href="#">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
);
};

export default Footer;
